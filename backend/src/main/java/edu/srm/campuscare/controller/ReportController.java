package edu.srm.campuscare.controller;

import edu.srm.campuscare.dto.CategoryReport;
import edu.srm.campuscare.dto.TicketCommentSummary;
import edu.srm.campuscare.service.JdbcReportService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final JdbcReportService reports;
    public ReportController(JdbcReportService reports) { this.reports = reports; }
    @GetMapping("/category-summary") public List<CategoryReport> categorySummary() { return reports.categorySummary(); }
    @GetMapping("/tickets/{id}") public TicketCommentSummary ticketWithCommentCount(@PathVariable Long id) { return reports.ticketWithCommentCount(id); }
}
