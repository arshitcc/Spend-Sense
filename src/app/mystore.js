import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const authStore = (set) => ({
   
    authStatus : false,
    user : null,

    userLogin : (user) => {
        set((state) => ({
            authStatus : true,
            user
        })) 
    },

    userLogout : () => {
        set((state) => ({
            authStatus : false,
            user : null
        }))
    }
})


const useAuthStore = create(
    devtools(
        persist(authStore, {
            name : 'auth'
        })
    )
)

export default useAuthStore;