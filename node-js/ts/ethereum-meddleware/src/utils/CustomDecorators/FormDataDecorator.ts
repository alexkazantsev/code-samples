import {createParamDecorator} from 'routing-controllers';

export function FormDataText(options?: { required?: boolean }) {
  return createParamDecorator({
    required: !!(options && options.required),
    value: action => {
      return action.context.req.body;
    },
  });
}
