package com.simplecoding.simpledmsreactlogin.publiccar.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_PUBLIC_CAR")
@SequenceGenerator(
        name = "SQ_PUBLIC_CAR_JPA",
        sequenceName = "SQ_PUBLIC_CAR",
        initialValue = 1,      // 필요 시 초기값 설정
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "pid", callSuper = false)
public class PublicCar extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_PUBLIC_CAR_JPA"
    )
    private Long pid;
    private String carName;
    private String floor;
    private Long capacity;
}
