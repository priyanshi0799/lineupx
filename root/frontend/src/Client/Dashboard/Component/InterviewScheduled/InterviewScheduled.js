import React from "react";
import {
    InterviewScheduleWrapper,
    Interviews,
    LabelWrapper,
    Label,
} from "./style";

export default function InterviewScheduled(props) {
    return (
        <InterviewScheduleWrapper>
            {props.interviewSchedule.map((interview, i) => (
                <Interviews
                    key={i}
                    index={i}
                    length={props.interviewSchedule.length}
                >
                    <LabelWrapper>
                        <Label type="dark">{interview.candidate}</Label>
                        <Label type="grey">
                            {interview.date}
                            {", " + interview.time}
                        </Label>
                    </LabelWrapper>
                    <Label
                        type="grey"
                        index={i}
                        length={props.interviewSchedule.length}
                    >
                        {interview.title}
                        {", " + interview.place}
                    </Label>
                </Interviews>
            ))}
        </InterviewScheduleWrapper>
    );
}
