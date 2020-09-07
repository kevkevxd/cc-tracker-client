class FetchAdapter {
    constructor(baseUrl){         
        this.baseUrl = baseUrl  
    }

    get(relativeUrl, callback){        
        fetch(`${this.baseUrl}${relativeUrl}`)
            .then(resp => resp.json())
            .then(callback) 
    }
}

