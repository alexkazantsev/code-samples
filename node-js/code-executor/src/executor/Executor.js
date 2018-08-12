const { spawn } = require('child_process');
const { EOL } = require('os');
const Docker = require('dockerode');
const Logger = require('./../utils/Logger');

const containerOptions = Symbol('containerOptions');
const docker = new Docker();

class Executor {

  /**
   * Code executor.
   * @param {String} language 
   * @param {String} code 
   */
  constructor(language) {
    this.language = language;
    this.stderror = '';
    this.stream = null;
    this.container = null;
    this.logger = new Logger('Executor');
  }

  static async prepare(images = [], cb) {
    const logger = new Logger('Prepare executor');

    try {

      if (!images.length) return cb();
      const image = images.shift();

      const imgs = await docker.listImages();
      const _img = imgs.find(img => img.RepoTags.includes(image));

      if (_img) return Executor.prepare(images, cb);

      logger.info(`Pulling missing image: ${image}. It can takes some time.`);

      docker.pull(image, (err, stream) => {
        if (err) return cb(err);

        docker.modem.followProgress(stream, (err, data) => {
          if (err) {
            logger.error(`Error while pulling ${image}`);
            logger.error(err);
            return
          }
          logger.info(`Successfully pulled ${image} image`);
          Executor.prepare(images, cb);
        });
      })
    } catch (e) {
      logger.error('Preparing error: ', e)
    }
  }

  [containerOptions]() {
    const options = {
      Tty: true,
      AttachStdout: true,
      AttachStderr: true,
      Env: ['PYTHONUNBUFFERED=1']
    };
    switch (this.language) {
      case 'python3':
        return { ...options, Image: 'python:3-slim' };
      case 'python2':
      default:
        return { ...options, Image: 'python:2.7-slim' };
    }
  }

  /**
   * Run the code in docker container
   * @param {String} code 
   * @param {Function} cb 
   */
  run(code, cb) {
    const options = this[containerOptions]();

    docker.createContainer(options, async (err, container) => {
      if (err) return cb(err);

      await container.start();

      /** CLOSE A STREAM AND REMOVE CONTAINER AFTER IT WAS KILLED */
      container.wait((err, data) => {
        this.stream.end();
        this.container.remove();
      });

      this.container = container;

      container.exec({
        Cmd: ['python', '-c', code],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false
      }, (err, exec) => {
        exec.start({ hijack: true, stdin: true, stdout: true, stderr: true }, (err, stream) => {
          this.stream = stream;
          cb();
        });
      });
    });
  }

  /**
   * Kill docker container
   * @returns {void}
   */
  kill() { this.container.kill(); }

  /**
   * Write a string to the open stdin
   * @param {String} str 
   */
  writeSTDIN(str) {
    this.stream.write(str + EOL);
  }

  /**
   * Fire each time when stdout provide the data.
   * @param {Function<String>} cb 
   */
  onData(cb) {
    if (!(cb instanceof Function)) throw Error('callback is not a function');
    this.stream.on('data', chunk => {
      /**
       * Removing 8 bytes of the headers from docker output. 
       * 
       * header := [8]byte{STREAM_TYPE, 0, 0, 0, SIZE1, SIZE2, SIZE3, SIZE4}
       * 
       * `STREAM_TYPE` can be:
       * -   0: stdin (will be written on stdout)
       * -   1: stdout
       * -   2: stderr
       * 
       * `SIZE1, SIZE2, SIZE3, SIZE4` are the 4 bytes of the uint32 size encoded as big endian.
       * 
       * Check this link: https://github.com/moby/moby/blob/1ae8ca9e0c56b4aec8c0684bc9e20b8291d622f8/docs/api/v1.24.md#attach-to-a-container
       * On the `HEADERS` section below
       */
      const str = chunk
        .slice(-(chunk.length - 8))
        .toString('utf-8');
      cb(str);
    });
  }

  /**
   * Fire once stdout was closed.
   * @param {Function<void>} cb 
   */
  onDone(cb) {
    if (!(cb instanceof Function)) throw Error('callback is not a function');
    this.stream.on('end', () => this.container.kill(() => cb()));
  }

  /**
   * Provide collected error string once stdout were closed.
   * @param {Function<String>} cb 
   */
  onError(cb) {
    if (!(cb instanceof Function)) throw Error('callback is not a function');
    this.stream.on('end', () => this.stderror && cb(this.stderror));
  }

}

module.exports = Executor;
