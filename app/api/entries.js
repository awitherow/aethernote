import { categories } from '../lib/schema';
import moment from 'moment';
import axios from 'axios';

import { sharedHeaders } from './_helpers';
import { getToken } from './security';

export const get = (username, cb) => {
    const token = getToken();
    axios({
        url: '/api/notes',
        method: 'GET',
        headers: {
            token,
            username,
        },
    }).then(r => cb(r.data)).catch(e => new Error(e));
};

export const add = (entry, username, cb) => {
    if (!entry.category) {
        entry.category = categories[entry.type][0];
    }

    if (!entry.prio) {
        entry.prio = 1;
    }

    if (entry.type === 'finance') {
        entry.title = `${entry.content.description.substring(0, 32)}`;
    } else if (entry.type !== 'habit') {
        entry.title = `${entry.content.substring(0, 32)}`;

        if (entry.type === 'exercise') {
            entry.context = 'health';
            delete entry.content;
            entry.content = {
                total: 0,
                best: {
                    date: moment(),
                    value: 0,
                    multiplier: 0,
                },
            };
        }
    } else {
        entry.title = entry.content;
        entry.content = 0;
    }

    const token = getToken();
    axios({
        url: '/api/notes',
        method: 'POST',
        headers: {
            ...sharedHeaders,
            username,
            token,
        },
        data: {
            entry,
        },
    }).then(r => cb(r)).catch(e => new Error(e));
};

export const remove = (id, username, cb) => {
    const token = getToken();
    axios({
        url: `/api/notes/${id}`,
        method: 'DELETE',
        headers: {
            ...sharedHeaders,
            username,
            token,
        },
    }).then(r => cb(r)).catch(e => new Error(e));
};

export const update = (update, username, cb) => {
    const token = getToken();
    axios({
        url: `/api/notes/${update.id}`,
        method: 'PUT',
        headers: {
            ...sharedHeaders,
            username,
            token,
        },
        data: {
            update,
        },
    }).then(r => cb(r)).catch(e => new Error(e));
};

export const toggleCompletion = (entry, username, cb) => {
    const token = getToken();
    axios({
        url: `/api/notes/complete/${entry.id}`,
        method: 'PUT',
        headers: {
            ...sharedHeaders,
            username,
            token,
        },
        data: {
            entry: {
                complete: !entry.complete,
                id: entry.id,
            },
        },
    }).then(r => cb(r)).catch(e => new Error(e));
};
