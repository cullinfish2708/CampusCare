package edu.srm.campuscare;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(locations="classpath:application-test.properties")
class TicketApiIntegrationTest {
 @Autowired MockMvc mvc;
 @Test void createsTicketAndSupportsCommentCrud() throws Exception {
  String response=mvc.perform(post("/api/tickets").contentType(MediaType.APPLICATION_JSON).content("""
   {"title":"Broken network socket in room 101","description":"The wall network socket is loose and the LAN connection drops repeatedly.","category":"IT_SUPPORT","priority":"HIGH","location":"CSE Block - Room 101","requesterName":"Demo Student","requesterEmail":"student@example.test"}
  """)).andExpect(status().isCreated()).andExpect(jsonPath("$.ticketCode").exists()).andReturn().getResponse().getContentAsString();
  Long id=((Number)com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(response).get("id").numberValue()).longValue();
  String comment=mvc.perform(post("/api/tickets/"+id+"/comments").contentType(MediaType.APPLICATION_JSON).content("{\"authorName\":\"Demo Staff\",\"content\":\"Technician assigned for inspection.\"}"))
   .andExpect(status().isCreated()).andExpect(jsonPath("$.id").exists()).andReturn().getResponse().getContentAsString();
  Long commentId=((Number)com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(comment).get("id").numberValue()).longValue();
  mvc.perform(put("/api/comments/"+commentId).contentType(MediaType.APPLICATION_JSON).content("{\"content\":\"Technician will inspect this afternoon.\"}"))
   .andExpect(status().isOk()).andExpect(jsonPath("$.content").value("Technician will inspect this afternoon."));
  mvc.perform(delete("/api/comments/"+commentId)).andExpect(status().isNoContent());
  mvc.perform(get("/api/reports/tickets/"+id)).andExpect(status().isOk()).andExpect(jsonPath("$.commentCount").value(0));
  mvc.perform(get("/api/tickets/"+id)).andExpect(status().isOk()).andExpect(jsonPath("$.commentCount").value(0));
 }
 @Test void rejectsInvalidTicketWithFieldErrors() throws Exception {
  mvc.perform(post("/api/tickets").contentType(MediaType.APPLICATION_JSON).content("{\"title\":\"\",\"description\":\"short\",\"category\":\"IT_SUPPORT\",\"priority\":\"HIGH\",\"location\":\"\",\"requesterName\":\"\",\"requesterEmail\":\"not-an-email\"}"))
   .andExpect(status().isBadRequest()).andExpect(jsonPath("$.fields.title").exists()).andExpect(jsonPath("$.fields.requesterEmail").exists());
 }
}
