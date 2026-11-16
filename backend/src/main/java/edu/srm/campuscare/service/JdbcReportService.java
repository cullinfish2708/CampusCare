package edu.srm.campuscare.service;

import edu.srm.campuscare.dto.CategoryReport;
import edu.srm.campuscare.dto.TicketCommentSummary;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

/** SQL reporting implemented through Spring JDBC. JdbcTemplate obtains and releases JDBC
 * Connections and manages PreparedStatement/ResultSet resources for each query. */
@Service
public class JdbcReportService {
    private final JdbcTemplate jdbc;
    public JdbcReportService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    public List<CategoryReport> categorySummary() {
        String sql = "SELECT category, COUNT(*) AS total_tickets, " +
                "SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) AS open_tickets " +
                "FROM tickets GROUP BY category ORDER BY category";
        return jdbc.query(sql, (rs, row) -> new CategoryReport(
                rs.getString("category"), rs.getLong("total_tickets"), rs.getLong("open_tickets")));
    }

    public TicketCommentSummary ticketWithCommentCount(Long ticketId) {
        String sql = "SELECT t.id, t.ticket_code, t.title, COUNT(c.id) AS comment_count " +
                "FROM tickets t LEFT JOIN ticket_comments c ON c.ticket_id = t.id " +
                "WHERE t.id = ? GROUP BY t.id, t.ticket_code, t.title";
        List<TicketCommentSummary> rows = jdbc.query(sql, (rs, row) -> new TicketCommentSummary(
                rs.getLong("id"), rs.getString("ticket_code"), rs.getString("title"), rs.getLong("comment_count")), ticketId);
        if (rows.isEmpty()) throw new EntityNotFoundException("Ticket not found: " + ticketId);
        return rows.get(0);
    }
}
