// 'Calendar' 컴포넌트는 FullCalendar 라이브러리를 사용하여 달력을 표시하고,
// 사용자 상호작용을 처리하는 페이지를 구성합니다.
// 이벤트 추가, 삭제와 같은 기능을 제공하며, MUI 컴포넌트들을 사용하여 스타일을 적용합니다.

import { useState } from "react"; // 상태 관리를 위해 'useState'를 사용합니다.
import { formatDate } from '@fullcalendar/core'; // 날짜 형식을 지정하기 위해 'formatDate'를 가져옵니다.
import FullCalendar from '@fullcalendar/react'; // FullCalendar의 리액트 컴포넌트를 불러옵니다.
import dayGridPlugin from "@fullcalendar/daygrid"; // 'dayGrid' 플러그인을 사용합니다.
import timeGridPlugin from "@fullcalendar/timegrid"; // 'timeGrid' 플러그인을 사용합니다.
import interactionPlugin from "@fullcalendar/interaction"; // 사용자 상호작용을 처리하기 위한 플러그인입니다.
import listPlugin from "@fullcalendar/list"; // 리스트 형태로 이벤트를 보여주는 플러그인입니다.
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material"; // MUI에서 제공하는 컴포넌트들을 불러옵니다.
import Header from "../../components/Header"; // 페이지 상단의 헤더 컴포넌트를 불러옵니다.
import { tokens } from "../../theme"; // 테마 색상 토큰을 불러옵니다.

const Calendar = () => {
    const theme = useTheme(); // 현재 테마를 가져오기 위해 'useTheme' 훅을 사용합니다.
    const colors = tokens(theme.palette.mode); // 테마에 맞는 색상 토큰을 설정합니다.
    const [currentEvents, SetCurrentEvents] = useState([]); // 현재 달력에 표시되는 이벤트들을 상태로 관리합니다.

    // 날짜를 클릭했을 때 호출되는 함수입니다.
    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event"); // 새로운 이벤트의 제목을 입력받습니다.
        const calendarApi = selected.view.calendar; // 선택된 날짜의 캘린더 인스턴스를 가져옵니다.
        calendarApi.unselect(); // 선택 상태를 해제합니다.

        // 제목이 입력된 경우 새로운 이벤트를 추가합니다.
        if (title){
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`, // 이벤트 ID를 설정합니다.
                title, // 입력된 제목을 설정합니다.
                start: selected.startStr, // 이벤트 시작 날짜를 설정합니다.
                end: selected.endStr, // 이벤트 종료 날짜를 설정합니다.
                allDay: selected.allDay // 하루 종일 이벤트인지 여부를 설정합니다.
            });
        }
    };

    // 이벤트를 클릭했을 때 호출되는 함수입니다.
    const handleEventClick = (selected) => {
        // 이벤트 삭제 여부를 확인하고, 확인되면 해당 이벤트를 제거합니다.
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)){
            selected.event.remove(); // 이벤트를 삭제합니다.
        }
    };

    return (
      <Box m="20px"> {/* 페이지 외부 여백을 설정합니다. */}
        <Header title="CALEDAR" subtitle="Full Calendar Interative Page" /> {/* 페이지 상단의 제목과 부제목을 표시합니다. */}

        <Box display="flex" justifyContent="space-between"> {/* 달력과 사이드바를 나란히 배치합니다. */}
            {/* CALENDAR SIDEBAR */}
            <Box 
              flex="1 1 20%" 
              backgroundColor={colors.primary[400]} 
              p='15px' 
              borderRadius="4px"
            > {/* 사이드바의 스타일을 설정합니다. */}
              <Typography variant="h5">Events</Typography> {/* 'Events'라는 제목을 표시합니다. */}
              <List> {/* 이벤트 리스트를 표시합니다. */}
                {currentEvents.map((event) => (
                    <ListItem
                      key={event.id}
                      sx={{ 
                        backgroundColor: colors.greenAccent[500], // 각 이벤트의 배경색을 설정합니다.
                        margin: "10px 0", // 이벤트 항목 간의 여백을 설정합니다.
                        borderRadius: "2px", // 이벤트 항목의 테두리를 둥글게 설정합니다.
                    }}
                    >
                      <ListItemText
                        primary={event.title} // 이벤트 제목을 표시합니다.
                        secondary={
                            <Typography>
                                {formatDate(event.start, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })} {/* 이벤트의 시작 날짜를 표시합니다. */}
                            </Typography>
                        }
                        />
                    </ListItem>
                ))}
              </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px"> {/* 달력의 크기와 왼쪽 여백을 설정합니다. */}
                <FullCalendar 
                    height="70vh" // 달력의 높이를 설정합니다.
                    plugins={[
                        dayGridPlugin, // 월간 보기 플러그인을 추가합니다.
                        timeGridPlugin, // 주간 및 일간 보기 플러그인을 추가합니다.
                        interactionPlugin, // 이벤트 상호작용을 가능하게 하는 플러그인을 추가합니다.
                        listPlugin // 이벤트 리스트 보기를 위한 플러그인을 추가합니다.
                    ]}
                    headerToolbar={{
                        left: "prev,next today", // 왼쪽에 이전, 다음, 오늘 버튼을 배치합니다.
                        center: "title", // 중앙에 달력의 제목을 배치합니다.
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth" // 오른쪽에 보기 옵션을 배치합니다.
                    }}
                    initialView="dayGridMonth" // 달력의 초기 보기를 월간 보기로 설정합니다.
                    editable={true} // 이벤트 수정 가능 여부를 설정합니다.
                    selectable={true} // 날짜 선택 가능 여부를 설정합니다.
                    selectMirror={true} // 선택할 때 미리보기를 활성화합니다.
                    dayMaxEvents={true} // 하루에 표시할 최대 이벤트 수를 설정합니다.
                    select={handleDateClick} // 날짜 선택 시 호출될 함수를 설정합니다.
                    eventClick={handleEventClick} // 이벤트 클릭 시 호출될 함수를 설정합니다.
                    eventsSet={(events) => SetCurrentEvents(events)} // 이벤트가 변경될 때 상태를 업데이트합니다.
                    initialEvents={[ // 초기 이벤트를 설정합니다.
                        { id: "1234", title: "All-day event", date: "2023-10-09" },
                        { id: "4321", title: "Timed event", date: "2023-10-02" },
                    ]}
                />
            </Box>
        </Box>
    </Box>
    );
};

export default Calendar;
