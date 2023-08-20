export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
};

export const AUTHORITY = {
    COMPANY_SUPER_ADMIN: 'COMPANY_SUPER_ADMIN',
    UPDATE_DEMO_USER: 'CMS_UPDATE_DEMO_USER'
};

export const AUTHORITY_ROUT_MAP = [
    { route_regx: "/manage/company", authority: ['CMS_UPDATE_DEMO_USER'] },
    { route_regx: "/manage/user", authority: ['CMS_UPDATE_DEMO_USER'] }
];
