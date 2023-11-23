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
    TICKET_DETAIL: '/ticket/ticket-detail',
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

export const ProcessMetaStatus = {
    STANDARD: 0,
    AI_PROCESSED: 1,
    DE_VERIFIED: 2, 
    DE_CREATED: 3,
    QC_VERIFIED: 4,
    QC_ASKED_FOR_REWORK: 5,
    DE_SKIPPED: 6,
    QC_SKIPPED: 7
};

export const FileProcessStatus = {
    DE_ASSIGNED: 5,
    DE_DONE: 6,
    QC_ASSIGNED: 7,
    QC_DONE: 8,
    DE_ERROR: 9,
    QC_ERROR: 10,
    DE_ERROR_MAX_REACHED: 11,
    DE_REASSIGNED: 12
};
