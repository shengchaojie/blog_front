
const context ="http://localhost"

function post(url,data,callback){
	//$.post(context+url,data,callback)

	$.ajax({
		type:'POST',
		url:context+url,
		data:JSON.stringify(data),
		contentType:'application/json',
		success:callback
	})
}

function get(url,callback){
	$.get(context+url,callback)
}

export {get, post}