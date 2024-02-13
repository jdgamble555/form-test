import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { decode } from 'decode-formdata';
import {
    date,
    instance,
    nullable,
    number,
    object,
    optional,
    safeParse,
    string
} from 'valibot';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        console.log(data);
        const schema = object({
            text: optional(string()),
            number: nullable(number()),
            date: nullable(date()),
            file: optional(instance(File))
        });
        const result = safeParse(schema, decode(data,
            { numbers: ['number'], dates: ['date'], files: ['file'] }
        ));
        if (!result.success) {
            const firstIssue = result.issues[0];
            if (!firstIssue.path) {
                error(405, firstIssue.message);
            }
            const pathItem = firstIssue.path[0];
            error(405, `${pathItem.key} - ${pathItem.value} - ${firstIssue.message}`);
        }
    }
} satisfies Actions;