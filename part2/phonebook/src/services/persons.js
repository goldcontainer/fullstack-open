import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
	return axios.get(baseUrl)
}

const create = newPerson => {
	return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => {
	const request = axios.put(`${baseUrl}/${id}`, newPerson)
	return request.then(response => response.data)
}

const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

const exportObj = {
	getAll,
	create,
	update,
	deletePerson
}

export default exportObj