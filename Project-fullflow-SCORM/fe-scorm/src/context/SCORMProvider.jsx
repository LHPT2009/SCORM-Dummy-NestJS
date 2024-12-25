import React, { createContext, useContext, useEffect } from "react";

const SCORMContext = createContext();

const SCORMProvider = ({ children, SCORMApi }) => {
    useEffect(() => {
        SCORMApi.LMSInitialize();
        return () => {
            SCORMApi.LMSFinish();
        };
    }, [SCORMApi]);

    return (
        <SCORMContext.Provider value={SCORMApi}>
            {children}
        </SCORMContext.Provider>
    );
};

export const useSCORM = () => {
    const context = useContext(SCORMContext);
    if (!context) {
        throw new Error("useSCORM must be used within a SCORMProvider");
    }
    return context;
};

export default SCORMProvider;