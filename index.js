
console.log('Запит даних')
const req = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Підготовка данних");
        const product = {
            name: "xxx2x",
            price: 224,
        };

        resolve(product);//запит виконано(resolve)
    }, 2000);
});

req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = "order";
            // resolve(product);
            reject()//запит не виконано(reject)
        }, 2000);
    });
}).then((data) => {//  --------------
    data.modify = true;             //ланцюг подій у разі разі resolve 
    return data;                    //
}).then((data) => {//  --------------
    console.log(data);
}).catch(()=>{// ---------------------- у випадку reject
    console.error('виникла помилка')
}).finally(()=>{// --------------------- виконання в кінці у будьякому випадку (finally)
    console.log('finally');
})


const test = time => {
    return new Promise(resolve => {
        setTimeout(()=> resolve(time) ,time); 
    });
};

test(1100).then((time)=>console.log(time))
test(2000).then((time)=>console.log(time))

Promise.all([test(2000),test(1000)]).then(()=> {
    console.log('all')                          /// ця конструкція приймає масив з промісами ,слугує для того щоб 
                                                /// ми мали можливість щось зробити тільки коли проміси в середені all виконаються.
                                                /// Отже коли проміс test(2000) і test(1000) виконаються , тільки тоді продовжиться дія.
})



Promise.race([test(2000),test(1000)]).then(()=> {
    console.log('all race')                      /// принцим відрізняється від алл . Тепер коли перший проміс виконається ланцюг дій 
})                                               /// продовжиться            