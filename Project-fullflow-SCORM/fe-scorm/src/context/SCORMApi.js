const SCORM_API = {
    data: {},

    LMSInitialize: function (param) {
        if (param !== "") {
            console.error("LMSInitialize expects an empty string as parameter.");
            return "false";
        }
        this.initialized = true;
        return "true";
    },

    LMSFinish: function (param) {
        if (param !== "") {
            console.error("LMSFinish expects an empty string as parameter.");
            return "false";
        }
        if (!this.initialized) {
            console.error("LMSFinish called before LMSInitialize.");
            return "false";
        }
        this.initialized = false;
        return "true";
    },

    LMSGetValue: function (key) {
        if (!this.initialized) {
            console.error("LMSGetValue called before LMSInitialize.");
            return "false";
        }
        if (typeof key !== "string" || key === "") {
            console.error("Invalid key provided to LMSGetValue.");
            return "";
        }
        const value = this.data[key] || "";
        return value;
    },

    LMSSetValue: function (key, value) {
        if (!this.initialized) {
            console.error("LMSSetValue called before LMSInitialize.");
            return "false";
        }
        if (typeof key !== "string" || key === "") {
            console.error("Invalid key provided to LMSSetValue.");
            return "false";
        }
        this.data[key] = value;
        return "true";
    },

    LMSCommit: function (param) {
        if (!this.initialized) {
            console.error("LMSSetValue called before LMSInitialize.");
            return "false";
        }
        if (param !== "") {
            console.error("LMSCommit expects an empty string as parameter.");
            return "false";
        }
        if (!this.initialized) {
            console.error("LMSCommit called before LMSInitialize.");
            return "false";
        }
        console.log("Data committed to LMS");
        return "true";
    },

    LMSGetLastError: function () {
        console.log("Returning last error code: 0 (No error)");
        return "0";
    },

    LMSGetErrorString: function (errorCode) {
        if (errorCode === "0") {
            return "No error.";
        }
        return "Unknown error code.";
    },

    LMSGetDiagnostic: function (errorCode) {
        if (errorCode === "0") {
            return "No diagnostic.";
        }
        return "Unknown diagnostic.";
    },
};

window.API = SCORM_API;

export default SCORM_API;
