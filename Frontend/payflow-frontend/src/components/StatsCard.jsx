function StatsCard({ title, value }) {
    return (
        <div>
            <h6 className="text-muted">{title}</h6>
            <h2 className="fw-bold text-accent mt-2">{value}</h2>
        </div>
    );
}

export default StatsCard;