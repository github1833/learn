

// 装饰器
const decorator_:ClassDecorator = (target:any)=>{
    console.log(target);
    target.prototype.name = "lee_name"
    
}


@decorator_
class Lee{
    constructor() {
        
    }
}

const lee:any = new Lee()
console.log(lee.name);
