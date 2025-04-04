import { createContext, useContext } from "react";

export const ColorContext = createContext(undefined);

export const useColorContext = () => {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error("useColorContext must be used within a ColorProvider");
    }
    return context;
}
