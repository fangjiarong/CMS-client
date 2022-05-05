import request from '@/utils/request'

// 获取书本列表
export const reqBooksList = ()=>{
    return request.get(`/api/book?page=1&total=10`)
}

// 保存书本或修改书本
// 修改的话会传递id
export const reqSaveBookOrUpdateBook = (isEdit,title,orderby,img,updateId)=>{
    if(isEdit){
        return  request.put(`/api/book/${updateId}`, {
            title: title,
            img: img,
            orderby: orderby,
        })
    }else{
        return request.post(`/api/book`, {
            title: title,
            img: img,
            orderby: orderby,
        })
    }
}