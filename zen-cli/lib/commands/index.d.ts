declare type ActionType = {
    [key: string]: {
        alias: string;
        description: string;
        option: Array<string>;
    };
};
declare const mapActions: ActionType;
export { mapActions };
