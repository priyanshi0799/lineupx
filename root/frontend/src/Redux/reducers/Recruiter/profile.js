import ActionTypes from "../../actions/Recruiter/ActionTypes";

const initialState = {
    isLoading: false,
    isPersonalInfoUpdated: false,
    isDomainExpertiseUpdated: false,
    isAdditionalInfoUpdated: false,
    profileUpdated: false,
    passwordUpdated: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOADING_PROFILE:
            return {
                ...state,
                isLoading: true,
                passwordUpdated: null,
            };
            break;
        case ActionTypes.PERSONAL_INFO_SUCCESS:
            return {
                ...state,
                isPersonalInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.DOMAIN_SUCCESS:
            return {
                ...state,
                isDomainExpertiseUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.ADDITIONAL_INFO_SUCCESS:
            return {
                ...state,
                isAdditionalInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                profileUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.PERSONAL_INFO_FAIL:
            return {
                ...state,
                isPersonalInfoUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.DOMAIN_FAIL:
            return {
                ...state,
                isDomainExpertiseUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.ADDITIONAL_INFO_FAIL:
            return {
                ...state,
                isAdditionalInfoUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.GET_USER_INFO_FAIL:
            return {
                ...state,
                profileUpdated: false,
                isLoading: false,
            };
            case ActionTypes.BILLING_INFO_FAIL:
            return {
                ...state,
                isBillingInfoUpdated: false,
                isLoading: false,
            };
            break;
            case ActionTypes.BILLING_INFO_SUCCESS:
            return {
                ...state,
                isBillingInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passwordUpdated: true,
            };
        case ActionTypes.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                passwordUpdated: false,
            };
        case ActionTypes.ADD_FEEDBACK_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFeedbackFormSuccess: true,
                 error: false,
            };
        case ActionTypes.ADD_FEEDBACK_FORM_FAIL:
            return {
                ...state,
                isLoading: false,
                isFeedbackFormSuccess: false,
                error: true,
            };
        case ActionTypes.GET_FEEDBACK_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getFeedbackFormSuccess: action.payload,
                error: true,
            };
        case ActionTypes.GET_FEEDBACK_FORM_FAIL:
            return {
                ...state,
                isLoading: false,
                getFeedbackFormSuccess: null,
                error: true,
            };
            case ActionTypes.SUPPORT_AND_ISSUE_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    isSupportAndIssueUpdated: true,
                };
    
            case ActionTypes.SUPPORT_AND_ISSUE_FAIL:
                return {
                    ...state,
                    isLoading: false,
                    isSupportAndIssueUpdated: false,
                };
            case ActionTypes.GET_USER_ISSUES_SUCCESS:
                console.log(action.payload)
                return {
                    ...state,
                    isLoading: false,
                    getSupportAndIssue: action.payload,
                };
            case ActionTypes.GET_USER_ISSUES_FAIL:
                return {
                    ...state,
                    isLoading: false,
                    getSupportAndIssue: null,
                };
        default:
            return state;
            break;
    }
};

export default profileReducer;
