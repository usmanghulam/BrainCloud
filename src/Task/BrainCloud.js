import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResults from 'react-filter-search';
import InputRange from 'react-input-range';

const Props = () => {

    const [users,setUsers] = useState([]);
    const [value, setValue] = useState(0);
    const [zoom,setZoom] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(users => setUsers(users.data))
        .catch(err => console.error(err))
    },[])

    const handleChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className="pb-5">
            <div>
                <form>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Brain Cloud</label>
                            <input value={value} onChange={handleChange} type="text" class="form-control" id="exampleInputEmail1" placeholder="Search By: Name/userName/company/website"/>
                        </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <button onClick={e => {
                            let name = users.sort(function(a, b){
                                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                                if (nameA < nameB)
                                 return -1;
                                if (nameA > nameB)
                                 return 1;
                            });
                            if(name) 
                            setUsers(name)
                            setValue(' ')
                        }} type="button" className="mr-2 btn btn-primary">By Name</button>
                        <button onClick={e => {
                            let name = users.sort(function(a, b){
                                let nameA=a.username.toLowerCase(), nameB=b.username.toLowerCase();
                                if (nameA < nameB)
                                 return -1;
                                if (nameA > nameB)
                                 return 1;
                            });
                            if(name) 
                            setUsers(name)
                            setValue('  ')
                        }}
                         type="button" className="mr-2 btn btn-secondary">By UserName</button>
                        <button onClick={e => {
                            let name = users.sort(function(a, b){
                                let nameA=a.company.name.toLowerCase(), nameB=b.company.name.toLowerCase();
                                if (nameA < nameB)
                                 return -1;
                                if (nameA > nameB)
                                 return 1;
                            });
                            if(name) 
                            setUsers(name)
                            setValue('   ')
                        }}
                         type="button" className="mr-2 btn btn-dark">By Company</button>
                        <button onClick={e => {
                            let name = users.sort(function(a, b){
                                let nameA=a.website.toLowerCase(), nameB=b.website.toLowerCase();
                                if (nameA < nameB)
                                 return -1;
                                if (nameA > nameB)
                                 return 1;
                            });
                            if(name) 
                            setUsers(name)
                            setValue('    ')
                        }}
                        type="button" className="mr-2 btn btn-danger">By Website</button>
                    </div>
                </form>
                <div style={{transform:`scale(${zoom})`}}>
                    <SearchResults
                    value={value}
                    data={users}
                    renderResults={results => (
                        <div>
                            {results.map(el => (
                            <div key={el.id} className="card text-white bg-success mb-3 ml-2" style={{maxWidth: '18rem', display:'inline-block'}}>
                                <div className="card-header">{el.username}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{el.name}</h5>
                                    <p className="card-text"><b>Company:</b> {el.company.name}</p>
                                    <p className="card-text"><b>Website:</b> {el.website}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                    />
                </div>
            </div>
            <input 
            type="range" 
            className="custom-range" 
            id="customRange1" 
            onChange={e => setZoom(e.target.value/90)} />
        </div>
    );
};

export default Props;