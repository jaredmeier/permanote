const user = {email: "test@test.com", password: "password"}

export const createUser = (user) => (
    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: { user }
    })
)

export const loginUser = (user) => (
    $.ajax ({
        method: 'POST',
        url: '/api/session',
        data: {user}
    })
)

export const logoutUser = () => (
    $.ajax ({
        method: 'DELETE',
        url: '/api/session'
    })
)