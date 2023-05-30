import React from 'react'
import { useParams, useHistory } from "react-router-dom";

export default function DaySchedule() {
    const history = useHistory();
    const { id } = useParams();
    console.log(id, "DaySchedule page id")
    return (
        <div>DaySchedule</div>
    )
}
