package edu.srm.campuscare.dto;
import java.util.Map;
public record DashboardSummary(long total, long open, long inProgress, long resolved, long urgent, Map<String,Long> byCategory) {}
