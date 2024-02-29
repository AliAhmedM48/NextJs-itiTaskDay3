import React from 'react';
import fs from 'fs/promises';
import path from 'path'

export async function getServerSideProps() {

    const filePath = path.join(process.cwd(), "data", "data.json");
    const dataJson = await fs.readFile(filePath);
    const data = JSON.parse(dataJson);
    return { props: { users: data } }
}

function ali({ users }) {


    return (
        <>
            <div>Users</div>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </>
    )
}

export default ali