FROM openjdk:8-jdk

ENV NODE_VERSION 8

ENV DB_HOST=sponsors_db
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=root
ENV DB_NAME=sponsors

RUN apt-get update && \
    apt-get install --no-install-recommends -y apt-transport-https maven && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install --no-install-recommends -y nodejs yarn  && \
    npm i -g npx && \
    apt-get -y autoremove && \
    apt-get -y autoclean && \
    rm -rf /var/lib/apt/lists/*

ADD ./frontend /frontend/
WORKDIR /frontend
RUN rm -rf node_modules && \
    npm install && \
    npm run build-production

ADD ./sponsors/ /sponsors/
WORKDIR /sponsors/
RUN mvn package -Dmaven.test.skip=true

EXPOSE 8080

ENTRYPOINT [ "sh", "-c", "java -Djava.security.egd=file:/dev/./urandom -jar /sponsors/target/sponsors.jar" ] 
