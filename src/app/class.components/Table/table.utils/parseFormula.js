import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export const parseFormula = text => {
    text = typeof text !== "string" ? text.toString() : text;
    if (!text.startsWith("=")) return text;
    const formula = text.slice(1);
    try {
        return new Function(`return ${formula}`)();
    } catch (err) {
        new ErrorDOM(`Unfortunately, the format of your formula <<${formula}>> is incorrect. Further details here: ${err.message}. Most probably, your formula is incomplete. Please kindly re-check and make the necessary corrections.`).throw();
    }
};
