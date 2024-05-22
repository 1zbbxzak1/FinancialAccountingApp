interface Translaions{
    en: string;
}
type Category = "Продукты"|"Одежда"|"Личное"|"Семья"|"Транспорт";

export const translations: { [key: string]: Translaions } = {
    "Продукты": { en: "food" },
    "Одежда": { en: "clothes" },
    "Личное": { en: "personal" },
    "Семья": { en: "family" },
    "Транспорт": { en: "transport" }
};