export class REGEX {
    public static readonly NUMBER_ONLY = /^-?(0|[1-9]\d*)?$/
    public static readonly NUMBER_WITH_SPECIAL_CHARACTERS =  /^[0-9*#+]+$/
    public static readonly NUMBER_ONLYWITHZERO = /^-?([0-9]\d*)?$/
    public static readonly ALPHABETS_ONLY = /^[A-Za-z]+$/
    public static readonly ALPHABETS_ONLY_WITH_SPACE = /^[A-Za-z ]+$/
    public static readonly ALPHA_NUMERIC = /^[a-zA-Z0-9]*$/
    public static readonly ALPHA_NUMERIC_WITH_SPACE = /^[a-zA-Z0-9 ]*$/
    public static readonly ALPHA_NUMERIC_WITH_NO_BEGINING_SPACE=/^[^-\s][a-zA-Z0-9_\s-]+$/
    public static readonly CAPITAL_ONLY = /^[A-Z]*$/
    public static readonly SMALL_ONLY = /^[a-z]*$/
    public static readonly ALPHA_NUMERIC_WITH_SPECIAL_CHARACTERS_WITH_SPACE = /^[A-Z0-9 @~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i
    public static readonly ALPHABETS_WITH_SPECIAL_CHARACTERS_WITH_SPACE = /^[A-Za-z @~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i
    public static readonly THREE_NUMERIC_WITH_TWO_DECIMALS = /^(\d{0,3}|\d)(\.\d{1,2})?$/
    public static readonly TEXT_WITH_NO_BEGINING_SPACE= /^[^-\s][a-zA-Z_\s-']+$/;
    public static readonly LATITUDE_LONGITUDE=/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/;
    public static readonly ALPHABETS_WITH_NO_BEGINING_SPACE = /^[^-\s][a-zA-Z_\s-]+$/


    public static readonly ALL_REGEXP = [
        {
            REG_EXP: /^-?(0|[1-9]\d*)?$/,
            ERROR_MSG: 'Only Numbers are allowed'
        },
        {
            REG_EXP: /^[0-9*#+]+$/,
            ERROR_MSG: 'Only Numbers with Special Characters are allowed'
        },

        {
            REG_EXP: /^[A-Za-z]+$/,
            ERROR_MSG: 'Only Alplabets are allowed'
        },
        {
            REG_EXP: /^[a-zA-Z0-9]*$/,
            ERROR_MSG: 'Only Alpha Numeric are allowed'
        },
        {
            REG_EXP: /^[a-zA-Z0-9 ]*$/,
            ERROR_MSG: 'Only Alpha Numeric with space are allowed'
        },
        {
            REG_EXP: /^[A-Z]*$/,
            ERROR_MSG: 'Only CAPITAL letters are allowed'
        },
        {
            REG_EXP: /^[a-z]*$/,
            ERROR_MSG: 'Only small letters are allowed'
        },
        {
            REG_EXP: /^-?([0-9]\d*)?$/,
            ERROR_MSG: 'Only Numbers are allowed, decimals are not allowed'
        },
        {
            REG_EXP: /^[A-Za-z ]+$/,
            ERROR_MSG: 'only alphabets with space are allowed'
        },
        {
            REG_EXP: /^[A-Z0-9 @~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i,
            ERROR_MSG: 'Alpha numeric with special characters are allowed'
        },
        {
            REG_EXP: /^[A-Za-z @~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i,
            ERROR_MSG: 'Alplabets with special characters are allowed'
        },
        {
            REG_EXP: /^(\d{0,3}|\d)(\.\d{1,2})?$/,
            ERROR_MSG: 'Three numricals with two decimals are allowed'
        },

        {
            REG_EXP: /^[^-\s][a-zA-Z0-9_\s-]+$/,
            ERROR_MSG: 'No spaces at the beginning or special characters are allowed'
        },
        {
            REG_EXP: /^[^-\s][a-zA-Z_\s-']+$/,
            ERROR_MSG: 'Only Alphabets with no space at the beginning'
        },
        {
            REG_EXP: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/,
            ERROR_MSG: 'Geolocation Invalid'
        },
        {
            REG_EXP: /^[^-\s][a-zA-Z_\s-]+$/,
            ERROR_MSG: 'Only Alphabets with no space at the beginning'
        }

    ]
}