const SCORM_API = {
    LMSInitialize: function () {
        console.log("SCORM: LMSInitialize called.");
        return "true";
    },
    LMSFinish: function () {
        console.log("SCORM: LMSFinish called.");
        return "true";
    },
    LMSGetValue: function (key) {
        console.log(`SCORM: LMSGetValue called for ${key}`);
        return "";
    },
    LMSSetValue: function (key, value) {
        console.log(`SCORM: LMSSetValue called for ${key} = ${value}`);
        return "true";
    },
    LMSCommit: function () {
        console.log("SCORM: LMSCommit called.");
        return "true";
    },
    LMSGetLastError: function () {
        return "0";
    },
    LMSGetErrorString: function () {
        return "No error.";
    },
    LMSGetDiagnostic: function () {
        return "No diagnostic.";
    },
};

export default SCORM_API;