export interface AccountSummary {
    balanceMandatory: number;
    balanceVoluntary: number;
    fundId: number;
    growthMandatory: number;
    growthVoluntary: number;
    netContributionMandatory: number;
    netContributionVoluntary: number;
    price: number;
    schemeName: string;
    totalContributionMandatory: number;
    totalContributionVoluntary: number;
    totalFeesMandatory: number;
    totalFeesVoluntary: number;
    totalUnitMandatory: number;
    totalUnitVoluntary: number;
    unitPrice: number;
}

export interface BioData{
    employees: Employee;
    lga: Array<LgaObj>;
    states: Array<State>;
}

export interface Employee{
    agentCode: string;
    approved: boolean;
    approvedBy: number;
    branchCode: string;
    checked: number;
    checkedBy: boolean;
    checkedDate: string;
    city: string;
    clientStatus: string;
    correspondenceAdds: string;
    correspondenceAdds1: string;
    dateCreated: string;
    dateEmployed: string;
    dateOfBirth: string;
    email: string;
    employeeContribution: number;
    employerAddress: string;
    employerAddress1: string;
    employerBusiness: string;
    employerCity: string;
    employerContribution: number;
    employerName: string;
    employerRcno: string;
    employerStatecode: string;
    firstname: string;
    formRefno: string;
    gender: string;
    gender1: boolean;
    lgaCode: string;
    maidenName: string;
    maritalStatus1: boolean;
    maritalStatusCode: string;
    mobilePhone: string;
    nationalityCode: string;
    nokAddress: string;
    nokCity: string;
    nokCountry: string;
    nokGender: string;
    nokGender1: boolean;
    nokMobilePhone: string;
    nokName: string;
    nokOthername: string;
    nokRelationship: string;
    nokStatecode: string;
    nokSurname: string;
    nokTitle: string;
    nokCorraddress1: string;
    nokCorraddress2: string;
    othernames: string;
    permCity: string;
    permState: string;
    permanentAddress: string;
    pin: string;
    pinInvalid: false;
    pinNotification: boolean;
    pinNotify: string;
    printStatus: boolean;
    registrationCode: string;
    schemeId: number;
    ssn: string;
    state: string;
    stateOfOrigin: string;
    stateOfPosting: string;
    stmtOption: boolean;
    surname: string;
    title: string;
    upload: boolean;
    uploadDate: string;
    userid: number;
}

export interface LgaObj{
    code: string;
    description: string;
    stateCode: string;
    trans_id: number;
}

export interface State {
    code: string;
    description: string;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
    contact_person: string;
    telephone: string;
}
export interface Expand {
    expanded: boolean;
}

export interface Download {
    id: number;
    title: string;
    download_count: string;
    file_name: string;
    category: string;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
}

export interface News {
    id: number;
    headline: string;
    slug: string;
    body: string;
    published: boolean;
    created_at: string;
    updated_at: string;
    imageUrl: string;
    news_category_id: number;
}

export interface PaymentHistoryModel {
    Id: number;
    Pin: string;
    Surname: string;
    Firstname: string;
    Othernames: string;
    Value_Date: string;
    Narration: string;
    Employer_RCNO: string;
    Employer_Name: string;
    Total_Contribution: number;
    Net_Contribution: number;
}



