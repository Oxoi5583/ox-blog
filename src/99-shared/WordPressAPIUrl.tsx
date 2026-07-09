export function apiRootUrl(){ return "https://wordpress.dec-oxoi.com/wp-json/wp/v2/";}

interface Parameter{
    key: string;
    value: string;
};

export function pathGetPosts(p_params : Parameter[] = []){
    let ret = apiRootUrl() + "/posts";

    if(p_params.length > 0){
        ret += "?";
        ret += p_params.map(row => row.key + '=' + row.value).join('&');
    }

    return ret;
}
export function pathGetPost(p_id : number){
    let ret = apiRootUrl() + "/posts/" + p_id.toString();
    return ret;
}

export function pathGetTags(p_params : Parameter[] = []){
    let ret = apiRootUrl() + "/tags";

    if(p_params.length > 0){
        ret += "?";
        ret += p_params.map(row => row.key + '=' + row.value).join('&');
    }

    return ret;
}


export function pathGetCates(p_params : Parameter[] = []){
    let ret = apiRootUrl() + "/categories";

    if(p_params.length > 0){
        ret += "?";
        ret += p_params.map(row => row.key + '=' + row.value).join('&');
    }

    return ret;
}
