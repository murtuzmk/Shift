import MyCalendar from "../components/MyCalendar";

export const ShiftCalendar = () => {
    return (
        <div className="text-2xl font-semibold flex justify-center items-center h-full">
            <h2 className="text-3xl font-bold mb-4">Your Calendar</h2>
            <MyCalendar />
        </div>
    );
};
