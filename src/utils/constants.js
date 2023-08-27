export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
};

export const AUTHORITY = {
    COMPANY_SUPER_ADMIN: 'COMPANY_SUPER_ADMIN',
    UPDATE_DEMO_USER: 'CMS_UPDATE_DEMO_USER',
    USER_QC: 'CMS_USER_QC',
    USER_DE: 'CMS_USER_DE'
};

export const AUTHORITY_ROUT_MAP = [
    { route_regx: "/company/manage", authority: ['CMS_UPDATE_DEMO_USER'] },
    { route_regx: "/user/manage", authority: ['CMS_UPDATE_DEMO_USER'] }
];
