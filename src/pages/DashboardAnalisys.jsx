import { loadBoard } from '../store/action/board.action';
import { Doughnut, Bar } from 'react-chartjs-2';
import logo from '../assets/img/loder.gif'
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class _DashboardAnalisys extends Component {

    getRndHexColor = () => {
        const n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    }

    getDataForChart = (mapObject) => {
        const rndClrs = Object.keys(mapObject).map(key => this.getRndHexColor())
        return {
            labels: Object.keys(mapObject),
            datasets: [{
                label: '# of Cards',
                data: Object.values(mapObject),
                backgroundColor: rndClrs,
                hoverBackgroundColor: rndClrs,
            }]
        };
    }

    dashboardNumbers = (board) => {
        if (!board || !board.members || !board.groups) return;
        let numOfMembers = board.members.length;
        let unarchivedCardsCount = 0;
        let archivedCardsCount = 0;
        board.groups.forEach(group => {
            const archivedCards = group.cards.filter(card => card.archivedAt);
            archivedCardsCount += archivedCards.length;
            unarchivedCardsCount += group.cards.length - archivedCards.length;
        })
        const cards = board.groups.reduce((acc, group) => [...acc, ...group.cards], []);
        const todosCount = cards.reduce((acc, card) => {
            if (!card.checklist) return acc;
            card.checklist.forEach(checklist => {
                checklist.todos.forEach(todo => {
                    if (todo.isDone) acc.checked++;
                    acc.total++;
                })
            })
            return acc;
        }, { checked: 0, total: 0 });
        if (todosCount.checked / todosCount.total > 0.75) todosCount.colorClass = 'todos-green';
        if (todosCount.checked / todosCount.total <= 0.5) todosCount.colorClass = 'todos-red';
        return { numOfMembers, archivedCardsCount, unarchivedCardsCount, todosCount };
    }

    cardsByGroups = (groups) => {
        if (!groups) return;
        const cardsByGroupsMap = groups.reduce((acc, group) => {
            const unArchivedCards = group.cards.filter(card => !card.archivedAt)
            acc[group.title] = unArchivedCards.length;
            return acc;
        }, {});
        return this.getDataForChart(cardsByGroupsMap);
    }

    cardsByMembers = (board) => {
        if (!board.members) return;
        const cardsByMembersMap = board.members.reduce((acc, member) => {
            let memberCardsCount = 0;
            for (let i = 0; i < board.groups.length; i++) {
                const unArchivedCards = board.groups[i].cards.filter(card => !card.archivedAt)
                for (let j = 0; j < unArchivedCards.length; j++) {
                    if (unArchivedCards[j].members.some(currMember => currMember._id === member._id)) memberCardsCount++;
                }
            }
            acc[member.fullname] = memberCardsCount;
            return acc;
        }, {});
        return {
            data: this.getDataForChart(cardsByMembersMap),
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        };
    }

    cardsByLabels = (groups, labels) => {
        if (!groups || !labels) return;
        const colorsMap = {
            green: '#61bd50',
            yellow: '#f1d600',
            orange: '#ff9f1a',
            red: '#eb5a47',
            purple: '#c377e1',
            blue: '#0079be',
            grey: '#838c91',
            black: '#202020'
        }
        let cards = groups.reduce((acc, group) => [...acc, ...group.cards], []);
        cards = cards.filter(card => !card.archivedAt);
        const labelsMap = labels.reduce((acc, currLabel) => {
            let cardsWithLabelCount = 0;
            cards.forEach(card => {
                if (card.labels.some(label => label.id === currLabel.id)) cardsWithLabelCount++;
            })
            acc[currLabel.id] = { name: currLabel.name, color: currLabel.color, count: cardsWithLabelCount };
            return acc;
        }, {})
        return {
            data: {
                labels: Object.keys(labelsMap).map(label => labelsMap[label].name),
                datasets: [
                    {
                        label: '# of Labels',
                        borderWidth: 1,
                        backgroundColor: Object.keys(labelsMap).map(label => colorsMap[labelsMap[label].color]),
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: Object.keys(labelsMap).map(label => labelsMap[label].count),
                    }
                ]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        }

    }

    render() {
        const { board } = this.props;
        if (!board) return <div className="loader-page"> <img src={logo} alt="loading..." /></div>
        const dashboardNumbers = this.dashboardNumbers(board);
        const cardsByGroups = this.cardsByGroups(board.groups);
        const cardsByMembers = this.cardsByMembers(board);
        const cardsByLabels = this.cardsByLabels(board.groups, board.labels)
        return !board
            ? <div>Loading...</div>
            : <div className="page-container" style={{ backgroundImage: `url(${board?.style?.bgImg})` }}>
                <div className="fade-analisys"></div>
                <h3 className="analysis-title"> {board.title} : Data Analysis</h3>
                <div className="home-nav"></div>
                <div className="analysis-dashboard-container">
                    {dashboardNumbers && <div className="chart-container summary-numbers-conatiner">
                        <div><span>Total Members</span><h3>{dashboardNumbers.numOfMembers}</h3></div>
                        <div>
                            <span>Cards On Board</span>
                            <h3>
                                {dashboardNumbers.unarchivedCardsCount}
                                <span className="total">{` (${dashboardNumbers.archivedCardsCount} archived)`}</span>
                            </h3>
                        </div>
                        <div>
                            <span>To-Dos Checked</span>
                            <h3 className={dashboardNumbers.todosCount.colorClass}>
                                {`${dashboardNumbers.todosCount.checked}`}
                                <span className="total">{` /${dashboardNumbers.todosCount.total}`}</span>
                            </h3></div>
                    </div>}
                    <div className="charts">
                        {cardsByMembers && <div className="chart-container cards-by-member-container">
                            <h3>Cards Per Member</h3>
                            <div className="data">
                                <Bar data={cardsByMembers.data} options={cardsByMembers.options} />
                            </div>
                        </div>}
                        {cardsByGroups && <div className="chart-container cards-by-group-container">
                            <h3>Cards Per Group</h3>
                            <div className="data">
                                <Doughnut data={cardsByGroups} />
                            </div>
                        </div>}
                        {cardsByLabels && <div className="chart-container cards-by-labels-container">
                            <h3>Labels Summary</h3>
                            <div className="data">
                                <Bar data={cardsByLabels.data} options={cardsByLabels.options} />
                            </div>
                        </div>}
                    </div>
                    <button className="chart-container-btn" onClick={() => this.props.history.push(`/board/`)}>Go Back</button>
                </div>
            </div >
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
    };
}

const mapDispatchToProps = {
    loadBoard,
}

export const DashboardAnalisys = connect(mapStateToProps, mapDispatchToProps)(_DashboardAnalisys)