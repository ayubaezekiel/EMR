import { useMutation } from "@tanstack/react-query"

const mutation = useMutation({
    mutationFn: (newTodo) => {
        return axios.post('/todos', newTodo)
    },
})