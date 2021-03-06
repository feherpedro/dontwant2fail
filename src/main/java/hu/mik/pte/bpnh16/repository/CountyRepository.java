package hu.mik.pte.bpnh16.repository;

import hu.mik.pte.bpnh16.domain.County;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the County entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountyRepository extends JpaRepository<County, Long> {

}
