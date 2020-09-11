function nativeType(value: string) {
    const bValue = value.toLowerCase();
    if (bValue === 'true') {
        return true;
    } else if (bValue === 'false') {
        return false;
    }

    return value;
}

const removeJsonTextAttribute = function(value: string, parentElement: any) {
    try {
        const keyNo = Object.keys(parentElement._parent).length;
        const keyName = Object.keys(parentElement._parent)[keyNo - 1];
        parentElement._parent[keyName] = nativeType(value);
    } catch {

    }
}

export const xml2jsonOptions = {
    compact: true,
    trim: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
    textFn: removeJsonTextAttribute
};
