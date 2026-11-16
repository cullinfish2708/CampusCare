package edu.srm.campuscare.repository;
import edu.srm.campuscare.entity.Ticket;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
public interface TicketRepository extends JpaRepository<Ticket,Long> {
 @EntityGraph(attributePaths="comments") Optional<Ticket> findWithCommentsById(Long id);
 boolean existsByTicketCode(String ticketCode);
}
