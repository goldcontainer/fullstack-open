import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (newPerson) => {
	return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => {
	const request = axios.put(`${baseUrl}/${id}`, newPerson)
	return request.then(response => response.data)
}

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const exportObj = {
	getAll,
	create,
	update,
	deletePerson
}

export default exportObj