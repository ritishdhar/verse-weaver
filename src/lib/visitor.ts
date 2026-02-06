export const getVisitorId = () => {
    let vid = localStorage.getItem('novel_visitor_id');
    if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem('novel_visitor_id', vid);
    }
    return vid;
};

export const getVisitorName = () => {
    // 1. Check for custom name first
    const customName = localStorage.getItem('novel_visitor_custom_name');
    if (customName) return customName;

    // 2. Fallback to generated name
    let vName = localStorage.getItem('novel_visitor_name');
    if (!vName) {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        vName = `Visitor_${randomNumber}`;
        localStorage.setItem('novel_visitor_name', vName);
    }
    return vName;
};

export const setVisitorName = (name: string) => {
    if (!name.trim()) {
        localStorage.removeItem('novel_visitor_custom_name');
    } else {
        localStorage.setItem('novel_visitor_custom_name', name.trim());
    }
};

export const getIsAnonymous = () => {
    return localStorage.getItem('novel_visitor_is_anonymous') === 'true';
};

export const setIsAnonymous = (isAnon: boolean) => {
    localStorage.setItem('novel_visitor_is_anonymous', isAnon.toString());
};

export const getReadingProgressKey = () => {
    const vid = getVisitorId();
    return `pdf_position_${vid}`;
};

export const getReadingTotalPagesKey = () => {
    const vid = getVisitorId();
    return `pdf_total_pages_${vid}`;
};
