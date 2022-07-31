export const fGet = async (url: string) => {
   try {
      let token: string | null = 'Bearer unauthorized'; // Bearer sah729ufew8h1278gdo
      if (localStorage.getItem('token')) {
         token = localStorage.getItem('token');
      }
      console.log(token)
      const response = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
      })
      return await response.json()
   } catch (error) {
      console.log(error)
   }
}

export const fGetBlob = async (url: string) => {
   try {
      const response = await fetch(url, {
         method: "GET",
      })
      return await response.blob()
   } catch (error) {
      console.log(error)
   }
}

export const fPost = async (url: string, postData: object) => {
   try {
      let token: string | null = 'Bearer unauthorized'; // Bearer sah729ufew8h1278gdo
      if (localStorage.getItem('token')) {
         token = localStorage.getItem('token');
      }
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(postData)
      })
      return await response.json()
   } catch (error) {
      console.log(error)
   }
}

export const fPatch = async (url: string, postData: object) => {
   try {
      let token: string | null = 'Bearer unauthorized'; // Bearer sah729ufew8h1278gdo
      if (localStorage.getItem('token')) {
         token = localStorage.getItem('token');
      }
      const response = await fetch(url, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(postData)
      })
      return await response.json()
   } catch (error) {
      console.log(error)
   }
}

export const fPut = async (url: string, postData: object) => {
   try {
      const response = await fetch(url, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(postData)
      })
      return await response.json()
   } catch (error) {
      console.log(error)
   }
}

export const fDel = async (url: string, postData: object) => {
   try {
      let token: string | null = 'Bearer unauthorized'; // Bearer sah729ufew8h1278gdo
      if (localStorage.getItem('token')) {
         token = localStorage.getItem('token');
      }
      console.log(token)
      const response = await fetch(url, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(postData)
      })
      return await response.json()
   } catch (error) {
      console.log(error)
   }
}

export const fPostMultipart = async (url: string, postData: any) => {
   try {
      const response = await fetch(url, {
         method: "POST",
         body: postData
      })
      return await response.json()
   } catch (error) {
      console.log(error)
   }
}
