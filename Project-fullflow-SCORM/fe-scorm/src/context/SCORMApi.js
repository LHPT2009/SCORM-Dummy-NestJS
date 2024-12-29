const SCORM_API = {
    dataStore: {},

    LMSInitialize: function () {
        console.log("LMS Initialized");
        return "true";
    },

    LMSFinish: function () {
        console.log("LMS Finished");
        console.log("Recorded Data:", this.dataStore);
        return "true";
    },

    LMSSetValue: function (key, value) {
        console.log(`Setting value for ${key}: ${value}`);
        this.dataStore[key] = value;
        return "true";
    },

    LMSCommit: function () {
        console.log("Data committed to LMS");
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