import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import SearchHistoryService from '../../api/SearchHistoryService'
// import SearchHistoryItem from './SearchHistoryItem'
import { Popconfirm, Table, TableColumnsType } from 'antd'

interface DataType {
    key: React.Key;
    searchContent: string;
    searchTime: string;
}



const SearchHistory: React.FC = () => {
    const [searchHistory, setSearchHistory] = useState<DataType[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const handleClick = (key: React.Key) => {
        SearchHistoryService.remove(parseInt(key.toString()))
            .then((res) => {
                console.log(res);
                SearchHistoryService.getAll()
                    .then((res) => {
                        const tempData = res.data.data;
                        setSearchHistory(res.data.data);
                        const dataListTemp: DataType[] = []
                        for (let i = 0; i < tempData.length; i++) {
                            const dateDataTemp = new Date(tempData[i].updated_at)
                            dataListTemp.push({
                                key: tempData[i].id,
                                searchContent: tempData[i].search,
                                searchTime: dateDataTemp.getFullYear().toString() + '-' + dateDataTemp.getMonth().toString() + '-' + dateDataTemp.getDate().toString() + ' ' + dateDataTemp.getHours().toString() + ':' + dateDataTemp.getMinutes().toString() + ':' + dateDataTemp.getSeconds().toString(),
                            })
                        }
                        setSearchHistory(dataListTemp);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => { console.log(err) })
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Time',
            dataIndex: 'searchTime',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortDirections: ['descend'],
        },
        {
            title: 'Search Content',
            dataIndex: 'searchContent',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     onFilter: (value: string, record) => record.address.indexOf(value) === 0,
        // },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleClick(record.key)}>
                    <a className={styles.blueColor}>Delete</a>
                </Popconfirm>,
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        SearchHistoryService.getAll()
            .then((res) => {
                const tempData = res.data.data;
                // console.log(tempData)
                setSearchHistory(res.data.data);
                const dataListTemp: DataType[] = []
                for (let i = 0; i < tempData.length; i++) {
                    const dateDataTemp = new Date(tempData[i].updated_at)
                    dataListTemp.push({
                        key: tempData[i].id,
                        searchContent: tempData[i].search,
                        // searchTime: tempData[i].updated_at,
                        searchTime: dateDataTemp.getFullYear().toString() + '-' + dateDataTemp.getMonth().toString() + '-' + dateDataTemp.getDate().toString() + ' ' + dateDataTemp.getHours().toString() + ':' + dateDataTemp.getMinutes().toString() + ':' + dateDataTemp.getSeconds().toString(),

                    })
                }
                setSearchHistory(dataListTemp);
                console.log(searchHistory)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className={styles.bg}>
            <p className={styles.title}>SearchHistory</p>
            {/* {searchHistory.map(() => {
                return (<div>
                    <SearchHistoryItem />
                </div>)
            })} */}
            <div className={styles.table}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={searchHistory} />
            </div>

        </div>
    )
}

export default SearchHistory
