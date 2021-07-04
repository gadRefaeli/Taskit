import { MemberIcon } from './MemberIcon'
import React, { Component } from 'react'
import Moment from 'react-moment'

export class CardActivitiesList extends Component {

    render() {
        const { activities, card } = this.props
        if (!activities) return <></>
        return (
            <div className="activity-list-card-container" >
                {activities.map((activity, index) => {
                    if (!activity.card) return <></>

                    if (activity.card.id === card.id) {
                        return <div className="activity-list-card" key={index}>
                            <MemberIcon member={activity.byMember} size={'small'} />
                            <div className="activity-list-content" >
                                {activity.txtCard && <>
                                    <div>
                                        <span className="activity-list-name">{activity.byMember.fullname.split(' ')[0]} </span>
                                        <span className="activity-list-txt">{activity.txtCard} </span>
                                    </div>
                                    <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                                </>}

                                {activity.attachment && <>
                                    <div>
                                        <span className="activity-list-name">{activity.byMember.fullname.split(' ')[0]} </span>
                                        <a href={activity.attachment} className="activity-list-txt">attachment</a>
                                    </div>
                                    <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                                </>}

                                {activity.commentTxt && <>
                                    <div>
                                        <span className="activity-list-name">{activity.byMember.fullname.split(' ')[0]}</span>
                                        <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                                    </div>
                                    <span className="activity-list-txt">{activity.commentTxt} </span>
                                </>}
                            </div>
                        </div>
                    }
                    else return <></>
                })}
            </div>
        )
    }
}
