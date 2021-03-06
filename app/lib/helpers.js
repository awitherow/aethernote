import Remarkable from 'remarkable';

export function convertToMarkdown(text) {
    let md = new Remarkable();
    return { __html: md.render(text) };
}

export const getYestereday = () =>
    new Date(new Date() - 1000 * 60 * 60 * 24).setHours(0, 0, 0, 0);

export const getToday = () => new Date().setHours(0, 0, 0, 0);

export const toTitleCase = str =>
    str.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );

export const isMobile = true && window.innerWidth <= 500;

export const sortByCategoryAndModified = entries =>
    entries.sort((a, b) => {
        if (a.category < b.category) return 1;
        if (a.category > b.category) return -1;
        // if the categories are equal, it will sort by id.
        if (a.modified < b.modified) return 1;
        if (a.modified > b.modified) return -1;
        return 0;
    });
