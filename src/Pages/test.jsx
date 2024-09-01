import { Table , Tr, Th, Td, Button , Input,Tbody } from '@chakra-ui/react'
import React , {useState , useEffect}from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@firebase/firestore'
import {db} from '../Firebase'
const Profile = () => {

 
    const [editingUserId, setIsEditingid] = useState("")
    const [users , setUsers] = useState([]) 
   const [userForm, setUserForm] = useState({
        name: '',
        email: ''
    })

     const fetchusers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
      }))
      setUsers(usersData)
     }


     useEffect(() => {
        fetchusers()
     }, [])

     const handleSubmitUser = async () => {

    if(editingUserId ){
       const userDoc = doc(db,'users' ,editingUserId )
       await updateDoc(userDoc , userForm)
       setIsEditingid(null)
    }else{
       await addDoc(collection(db,"users"), userForm)
    }
    setUserForm({
       name: '',
        email: ''
    })
    fetchusers();
     }


     const handleDeleteUser = async(id) => {
      await deleteDoc(doc(db,'users', id))
      fetchusers();

     }
   

     const handleEditUser = (user) => {
      setIsEditingid(user.id)
      setUserForm({
        name: user.name,
        email: user.email
      })
     }
  

  return (
    <div>
    <h2>User Management</h2>

  
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Actions</Th>
        </Tr>
        {users.map(user => (
          <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <Button onClick={() => handleEditUser(user)} colorScheme="blue" size="sm">Edit</Button>
              <Button onClick={() => handleDeleteUser(user.id)} colorScheme="red" size="sm" ml={2}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>

  
    <div style={{ marginTop: '20px' }}>
      <Input
        placeholder="Name"
        value={userForm.name}
        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={userForm.email}
        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
        style={{ marginTop: '10px' }}
      />
      <Button onClick={handleSubmitUser} colorScheme={editingUserId ? "yellow" : "green"} size="sm" style={{ marginTop: '10px' }}>
        {editingUserId ? "Update User" : "Add User"}
      </Button>
    </div>
  </div>
  )
}

export default Profile