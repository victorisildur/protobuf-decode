/* message JSON结构，
 * 参见 https://github.com/dcodeIO/protobuf.js
 */
export default  {
    package: 'qfind',
    messages: [
        {
            name: 'Summary',
            fields: [
                {
                    id: 1,
                    name: 'today_walk',
                    type: 'uint32'
                },
                {
                    id: 2,
                    name: 'today_run',
                    type: 'uint32'
                },
                {
                    id: 3,
                    name: 'history_walk',
                    type: 'uint32'
                },
                {
                    id: 4,
                    name: 'history_run',
                    type: 'uint32'
                },
                {
                    id: 5,
                    name: 'today_duration',
                    type: 'uint32'
                },
                {
                    id: 6,
                    name: 'history_duration',
                    type: 'uint32'
                },
                {
                    id: 7,
                    name: 'total_time',
                    type: 'uint32'
                },
                {
                    id: 8,
                    name: 'cur_time',
                    type: 'uint32'
                }
            ]
        },
        {
            name: 'HistoryDetail',
            fields: [
                {
                    id: 1,
                    name: 'date',
                    type: 'uint32'
                },
                {
                    id: 2,
                    name: 'run',
                    type: 'uint32'
                },
                {
                    id: 3,
                    name: 'walk',
                    type: 'uint32'
                },
                {
                    id: 4,
                    name: 'duration',
                    type: 'uint32'
                }
            ]
        },
        {
            name: 'HistoryData',
            fields: [
                {
                    id: 1,
                    name: 'details',
                    type: 'HistoryDetail'
                },
                {
                    id: 2,
                    name: 'tag',
                    type: 'uint32'
                }
            ]
        }
    ]
};
