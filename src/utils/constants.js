export const PageUrls = {
    INDEX: '/',
    LOGIN: '/login',
    ROLES: '/roles',
    COMPANY: '/company',
    LEADS: '/leads',
    CONTRACT: '/contract',
    CLAUSE: '/clause',
    CLAUSE_PROMPT: '/clause-prompt',
    UNAUTHORIZED: '/unauthorized',
    AUTHORITIES: '/authorities',
    REPORTS: '/reports',
    TICKETS: '/tickets',
    TICKET_DETAIL: '/ticket-detail',
    DASHBOARD: '/dashboard',
    USERS: '/users'
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
    { route_regx: PageUrls.LEADS, authority: [AUTHORITY.UPDATE_DEMO_USER] },
    { route_regx: PageUrls.CONTRACT, authority: [AUTHORITY.CLAUSE_PROMPT_MANAGEMENT] },
    { route_regx: PageUrls.CLAUSE, authority: [AUTHORITY.CLAUSE_PROMPT_MANAGEMENT] },
    { route_regx: PageUrls.CLAUSE_PROMPT, authority: [AUTHORITY.CLAUSE_PROMPT_MANAGEMENT] },
    { route_regx: PageUrls.ROLES, authority: [AUTHORITY.ROLE_ADMINISTRATOR] },
    { route_regx: PageUrls.TICKETS, authority: [AUTHORITY.USER_QC, AUTHORITY.USER_DE] }
];
