export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
};

export const PageUrls = {
    INDEX: '/',
    LOGIN: '/login',
    ROLES: '/roles',
    COMPANY: '/company',
    USER: '/user',
    CONTRACT: '/contract',
    CLAUSE: '/clause',
    CLAUSE_PROMPT: '/clause-prompt',
    UNAUTHORIZED: '/unauthorized',
    AUTHORITIES: '/authorities',
    REPORTS: '/reports'
};

export const AUTHORITY = {
    COMPANY_SUPER_ADMIN: 'COMPANY_SUPER_ADMIN',
    UPDATE_DEMO_USER: 'CMS_UPDATE_DEMO_USER',
    CLAUSE_PROMPT_MANAGEMENT: 'AUTHORITY_CLAUSE_PROMPT_MANAGEMENT',
    USER_QC: 'CMS_USER_QC',
    USER_DE: 'CMS_USER_DE',
    ROLE_ADMINISTRATOR: 'ROLE_AUTHORITY_ADMINISTRATOR'
};

export const AUTHORITY_ROUT_MAP = [
    { route_regx: PageUrls.COMPANY, authority: [AUTHORITY.UPDATE_DEMO_USER] },
    { route_regx: PageUrls.USER, authority: [AUTHORITY.UPDATE_DEMO_USER] },
    { route_regx: PageUrls.CONTRACT, authority: [AUTHORITY.CLAUSE_PROMPT_MANAGEMENT] },
    { route_regx: PageUrls.CLAUSE, authority: [AUTHORITY.CLAUSE_PROMPT_MANAGEMENT] },
    { route_regx: PageUrls.CLAUSE_PROMPT, authority: [AUTHORITY.CLAUSE_PROMPT_MANAGEMENT] },
    { route_regx: PageUrls.ROLES, authority: [AUTHORITY.ROLE_ADMINISTRATOR] },
];
